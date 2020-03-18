import logging

from flask import request
from flask_restplus import Resource

from .api import api
from .dto import popen as popen_dto
from .service import popen as popen_service

log = logging.getLogger(__name__)

ns = api.namespace('subprocess', description='TODO')

@ns.route('/popen')
class Popen(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Validation Error')
    @api.expect(popen_dto.post, validate=True)
    def post(self):
        """
        Execute a child program in a new process.
        """
        return popen_service(request.json)
