"""
处理notion导出来markdown文件，等notion开发api后，这里作废
notion导出的markdown会丢失code lang的信息，需要手工处理一下代码块
"""

import os
import re

if __name__ == '__main__':
    dirpath, dirnames, filenames = os.walk('content').__next__()
    for filename in filenames:
        filepath = os.path.join(dirpath, filename)
        if filepath.endswith('.md'):
            with open(filepath, 'r') as f:
                text = f.read()
                p1 = re.compile('#.*\n*meta:.*\n')
                p2 = re.compile('tags:.*\n创建时间.*\n更新时间.*\n')
                r = p2.sub('', p1.sub('', text))
                with open(filepath, 'w') as f1:
                    f1.write(r)
