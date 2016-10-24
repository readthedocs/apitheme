"""
Read the Docs API theme

A Sphinx theme specifically made for API documentation
"""

import sys

from setuptools import setup, find_packages


setup(
    name='sphinx-api-theme',
    version='1.0',
    url='https://github.com/rtfd/sphinx-api-theme',
    author='Anthony Johnson',
    author_email='aj@ohess.org',
    description='Read the Docs API theme',
    long_description=sys.modules[__name__].__doc__,
    zip_safe=False,
    platforms='any',
    packages=['apitheme'],
    package_data={
        'apitheme': [
            'theme.conf',
            '*.html',
            'static/css/*.css',
            'static/js/*.js',
            'static/font/*',
        ]
    },
    include_package_data=True,
    install_requires=[],
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Environment :: Console',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: Other/Proprietary License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Documentation',
        'Topic :: Utilities',
    ],
)
