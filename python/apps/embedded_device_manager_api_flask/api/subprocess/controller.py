import logging

from flask import Response
from flask import request
from flask_restplus import Resource

from .api import api
from .dto import popen as popen_dto
from .service import popen as popen_service
from .service import generate

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

@ns.route('/videofeed')
class Videofeed(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Validation Error')
    @api.expect(popen_dto.video, validate=True)
    def post(self):
        """
        Stream a video which has been treated by opencv to angular.
        """
        return Response(generate(),
		        mimetype = "multipart/x-mixed-replace; boundary=frame")
