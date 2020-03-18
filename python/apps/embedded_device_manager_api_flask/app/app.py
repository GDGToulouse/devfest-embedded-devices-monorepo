import logging.config
import os
from subprocess import PIPE, Popen

from flask import Blueprint, Flask
from flask_restplus import Api

from python.apps.embedded_device_manager_api_flask.api.subprocess.api import \
    api
from python.apps.embedded_device_manager_api_flask.api.subprocess.controller import \
    ns as subprocess_ns
from python.apps.embedded_device_manager_api_flask.assets.envs import \
    index as envs

app = Flask(__name__)
logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), './logging.conf'))
logging.config.fileConfig(logging_conf_path)
log = logging.getLogger(__name__)

def configure_app(flask_app):
    flask_app.config['SERVER_NAME'] = envs.FLASK_SERVER_NAME
    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = envs.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = envs.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = envs.RESTPLUS_MASK_SWAGGER
    flask_app.config['ERROR_404_HELP'] = envs.RESTPLUS_ERROR_404_HELP

def initialize_app(flask_app):
    configure_app(flask_app)
    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)

    api.add_namespace(subprocess_ns)

    flask_app.register_blueprint(blueprint)

def main():
    initialize_app(app)
    log.info('>>>>> Starting development server at http://{}/api/ <<<<<'.format(app.config['SERVER_NAME']))
    app.run(debug=envs.FLASK_DEBUG)

if __name__ == "__main__":
    main()
