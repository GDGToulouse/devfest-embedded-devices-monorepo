from subprocess import PIPE, Popen


def popen(request_json):
    request_json['env'] = None
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
