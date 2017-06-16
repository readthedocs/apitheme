# -*- coding: utf-8 -*-

import sys
import os

sys.path.append(os.path.abspath('.'))
sys.path.append(os.path.abspath('./test_py_module'))

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.mathjax',
    'sphinx.ext.viewcode',
    'sphinxcontrib.httpdomain',
]

# Math
mathjax_path = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"

templates_path = ['_templates']

source_suffix = '.rst'
master_doc = 'index'

project = u'Read the Docs API theme demo'
copyright = u'2017, Read the Docs, Inc'
author = u'Anthony Johnson'

version = '1.0.0'
release = '1.0.0'

exclude_patterns = []

html_theme = 'apitheme'
html_theme_path = ['../../']

html_theme_options = {
}

html_show_sourcelink = True

htmlhelp_basename = 'themedoc'

latex_elements = {}
latex_documents = [
    ('index', 'apithemedemo.tex', project, author, 'manual'),
]

man_pages = [
    ('index', 'apithemedemo', project, [author], 1)
]

texinfo_documents = [
  ('index', 'apithemedemo', project, author, 'apithemedemo', project,
   'Miscellaneous'),
]
