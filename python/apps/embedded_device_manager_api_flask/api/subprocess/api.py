import logging

from flask_restplus import Api

from python.apps.embedded_device_manager_api_flask.assets.envs import \
    index as envs

log = logging.getLogger(__name__)

api = Api(
    description=envs.API_DESCRIPTION,
    title=envs.API_TITLE,
    version=envs.API_VERSION
)

@api.errorhandler
def default_error_handler(e):
    message = 'An unhandled exception occurred.'
    log.exception(message)

    if not envs.FLASK_DEBUG:
        return {'message': message}, 500
