import re

with open('lib/medical/diseases.ts', 'r') as f:
    content = f.read()

updated_content = re.sub(
    r'(whenToSeekHelp:\s*"[^"]*")',
    r"\1,\n    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',\n    symptomImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80'",
    content
)

with open('lib/medical/diseases.ts', 'w') as f:
    f.write(updated_content)
