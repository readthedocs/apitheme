.. _sphinx: http://www.sphinx-doc.org

******************************
Read the Docs Sphinx API Theme
******************************

.. contents::

The Read the Docs API Theme is a mobile friendly theme similar to the official Read the Docs theme but designed specifically for API documentation.
  
.. (TODO) add an image of the theme but wait untill we are more stable

Installation
============

Via package
-----------

Currently, the only way to install this theme is by forking this repository (see below).

Via git or download
-------------------

Symlink or subtree the ``apitheme/apitheme`` repository into your documentation at
``docs/_themes/sphinx_rtd_theme`` then add the following two settings to your Sphinx
conf.py file:

.. code:: python

    html_theme = "apitheme"
    html_theme_path = ["_themes", ]
    
Configuration
=============

There are currently no way to customize the theme.

Changelog
=========

There have been no releases so far.

Contributing or modifying the theme
===================================

Set up your environment
-----------------------

1. Install sphinx_ into a virtual environment.

.. code::

    pip install sphinx

2. Install node, bower and gulp.

.. code::

    // Install node
    brew install node

    // Install bower and grunt
    npm install -g bower gulp

    // Now that everything is installed, let's install the theme dependecies.
    npm install

3. Now that our environment is set up, make sure you're in your virtual environment, go to
   this repository in your terminal and run grunt:

.. code::
  
   gulp
