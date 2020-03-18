from setuptools import find_packages, setup

setup(
    name='python',
    version='1.0.0',
    description='TODO',
    author='GDGToulouse',

    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers and/or events organizers',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'License :: OSI Approved :: MIT License'
    ],

    keywords='rest restplus api flask swagger openapi flask-restplus devfest gdgtoulouse TODO',

    packages=find_packages(),

    install_requires=['flask-restplus==0.13.0'],
)
