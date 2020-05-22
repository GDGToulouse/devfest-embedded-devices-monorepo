from subprocess import PIPE, Popen
from .dto.motion_detection.singlemotiondetector import SingleMotionDetector
from imutils.video import VideoStream
import numpy as np
import threading
import argparse
import datetime
import imutils
import time
import cv2

def popen(request_json):
    request_json['env'] = None;
    process = Popen(
        request_json['args'],
        bufsize=request_json['bufsize'],
        close_fds=request_json['close_fds'],
        creationflags=request_json['creationflags'],
        cwd=request_json['cwd'],
        encoding=None,
        env=request_json['env'],
        errors=None,
        executable=None,
        pass_fds=(),
        restore_signals=request_json['restore_signals'],
        shell=False,
        start_new_session=request_json['start_new_session'],
        startupinfo=None,
        stdout=PIPE,
        stderr=PIPE,
        text=None
    )
    stdout, stderr = process.communicate()
    return {
        "stderr": stderr.decode(),
        "stdout": stdout.decode()
    }

outputFrame = None
lock = threading.Lock()

faceCascade = cv2.CascadeClassifier('pyimagesearch/motion_detection/haarcascade_frontalface_default.xml')
vs = VideoStream(src=0).start()
time.sleep(2.0)

def detect_motion(frameCount):
    global vs, outputFrame, lock

    md = SingleMotionDetector(accumWeight=0.1)
    total = 0

    while True:
        frame = vs.read()
        frame = imutils.resize(frame, width=400)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (7, 7), 0)
        faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor=1.5,
            minNeighbors=5,
            minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE
        )

        timestamp = datetime.datetime.now()
        cv2.putText(frame, timestamp.strftime(
            "%A %d %B %Y %I:%M:%S%p"), (10, frame.shape[0] - 10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 255), 1)
        if len(faces) == 0:
            nbr =  0

        else:
            nbr = str(faces.shape[0])
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
            cv2.putText(frame, "Number of faces detected: " + nbr, (0, frame.shape[0] - frame.shape[0] + 10), cv2.FONT_HERSHEY_TRIPLEX, 0.35,  (0,255,0), 1)
        md.update(gray)
        total += 1

        with lock:
            outputFrame = frame.copy()

def generate():
	global outputFrame, lock

	while True:
		with lock:
			if outputFrame is None:
				continue
			(flag, encodedImage) = cv2.imencode(".jpg", outputFrame)

			if not flag:
				continue

		yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + 
            bytearray(encodedImage) + b'\r\n')

