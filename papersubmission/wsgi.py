"""
WSGI config for papersubmission project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "papersubmission.settings")

application = get_wsgi_application()

sys.path.append('/home/summer_project')
sys.path.append('/home/summer_project/papersubmission')