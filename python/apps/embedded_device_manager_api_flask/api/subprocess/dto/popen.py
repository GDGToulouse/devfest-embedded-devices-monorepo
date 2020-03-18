from flask_restplus import fields

from ..api import api

# References:
# - https://docs.python.org/3/library/subprocess.html#popen-objects

post = api.model('Execute a child program in a new process.', {
    'args': fields.List(fields.String, required=True, example=['pwd', '--logical'], description='The args argument as it was passed to Popen – a sequence of program arguments.'),
    'bufsize': fields.Integer(required=False, default=-1, toto=5, example=-1, description="""bufsize will be supplied as the corresponding argument to the open() function when creating the stdin/stdout/stderr pipe file objects:
- 0 means unbuffered (read and write are one system call and can return short)
- 1 means line buffered (only usable if universal_newlines=True i.e., in a text mode)
- any other positive value means use a buffer of approximately that size
- negative bufsize (the default) means the system default of io.DEFAULT_BUFFER_SIZE will be used."""),
    'close_fds': fields.Boolean(required=False, default=True, example=None, description='If close_fds is true, all file descriptors except 0, 1 and 2 will be closed before the child process is executed. Otherwise when close_fds is false, file descriptors obey their inheritable flag as described in Inheritance of File Descriptors.'),
    'creationflags': fields.Integer(required=False, default=0, example=0, description=""" creationflags, if given, can be one or more of the following flags:
- CREATE_NEW_CONSOLE
- CREATE_NEW_PROCESS_GROUP
- ABOVE_NORMAL_PRIORITY_CLASS
- BELOW_NORMAL_PRIORITY_CLASS
- HIGH_PRIORITY_CLASS
- IDLE_PRIORITY_CLASS
- NORMAL_PRIORITY_CLASS
- REALTIME_PRIORITY_CLASS
- CREATE_NO_WINDOW
- DETACHED_PROCESS
- CREATE_DEFAULT_ERROR_MODE
- CREATE_BREAKAWAY_FROM_JOB"""),
    'cwd': fields.String(required=False, default=None, example=".", description="""If cwd is not None, the function changes the working directory to cwd before executing the child. cwd can be a string, bytes or path-like object. In particular, the function looks for executable (or for the first item in args) relative to cwd if the executable path is a relative path."""),
    'env': fields.Wildcard(fields.String, required=False, default={}, example={}, description="""If env is not None, it must be a mapping that defines the environment variables for the new process; these are used instead of the default behavior of inheriting the current process' environment."""),
    'restore_signals': fields.Boolean(required=False, default=True, example=True, description="""If restore_signals is true (the default) all signals that Python has set to SIG_IGN are restored to SIG_DFL in the child process before the exec. Currently this includes the SIGPIPE, SIGXFZ and SIGXFSZ signals. (POSIX only)"""),
    'start_new_session': fields.Boolean(required=False, default=False, example=False, description="""If start_new_session is true the setsid() system call will be made in the child process prior to the execution of the subprocess. (POSIX only)""")
})
