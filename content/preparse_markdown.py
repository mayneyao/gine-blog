# -*- coding: utf-8 -*-

"""
处理notion导出来markdown文件，等notion开发api后，这里作废
notion导出的markdown会丢失code lang的信息，需要手工处理一下代码块
"""

import os
import re

import sys
import locale


if __name__ == '__main__':
    dirpath, dirnames, filenames = os.walk('posts').__next__()
    for filename in filenames:
        filepath = os.path.join(dirpath, filename)
        if filepath.endswith('.md'):
            with open(filepath, 'r') as f:
                text = f.read()
                r = text.split('meta: \n')[-1]
                p =re.compile('public_date.*\ntags.*\nupdate_time.*')
                r = p.sub('',r)
                with open(filepath, 'w') as f1:
                    f1.write(r)
