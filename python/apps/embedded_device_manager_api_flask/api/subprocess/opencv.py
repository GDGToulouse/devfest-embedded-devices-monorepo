import argparse
import datetime
import threading
import time
from json import dumps

import cv2
import imutils
import numpy as np
from flask import jsonify
from imutils.video import VideoStream

from .pyimagesearch.motion_detection.singlemotiondetector import \
    SingleMotionDetector

outputFrame = None
viewers = 0
lock = threading.Lock()

faceCascade = cv2.CascadeClassifier('python/apps/embedded_device_manager_api_flask/api/subprocess/pyimagesearch/motion_detection/haarcascade_frontalface_default.xml')
vs = VideoStream(src=0).start()
time.sleep(2.0)

def opencv_infos():
    infos = {}
    infos['viewers'] = viewers
    print(viewers)
    return (dumps(infos))

def detect_motion(frameCount):
    global vs, outputFrame, lock, viewers

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
        viewers = len(faces)
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

ap = argparse.ArgumentParser()
ap.add_argument("-f", "--frame-count", type=int, default=32,
    help="# of frames used to construct the background model")
args = vars(ap.parse_args())

t = threading.Thread(target=detect_motion, args=(
    args["frame_count"],))
t.daemon = True
t.start()
