import base64
import re

# Read original HTML
with open(r"C:\Users\jack\.qclaw\workspace\projects\vpet\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Read the c4 PNG files
with open(r"C:\Users\jack\.qclaw\workspace\projects\vpet\sprites\lobster_c4_neutral.png", "rb") as f:
    c4_neutral = base64.b64encode(f.read()).decode()
with open(r"C:\Users\jack\.qclaw\workspace\projects\vpet\sprites\lobster_c4_happy.png", "rb") as f:
    c4_happy = base64.b64encode(f.read()).decode()
with open(r"C:\Users\jack\.qclaw\workspace\projects\vpet\sprites\lobster_c4_sad.png", "rb") as f:
    c4_sad = base64.b64encode(f.read()).decode()
with open(r"C:\Users\jack\.qclaw\workspace\projects\vpet\sprites\lobster_c4_sick.png", "rb") as f:
    c4_sick = base64.b64encode(f.read()).decode()

# 1. Remove lobster_color_0 through lobster_color_3 entries (old dead data)
html = re.sub(r'\s*"lobster_color_\d": "data:image/png;base64,[^"]+",?\n?', '', html)

# 2. Find lobster_c3_sick entry and add c4 entries after it
c4_entries = f'''
  "lobster_c4_neutral": "data:image/png;base64,{c4_neutral}",
  "lobster_c4_happy": "data:image/png;base64,{c4_happy}",
  "lobster_c4_sad": "data:image/png;base64,{c4_sad}",
  "lobster_c4_sick": "data:image/png;base64,{c4_sick}",
'''

# Find lobster_c3_sick and add c4 after it
html = re.sub(
    r'("lobster_c3_sick": "data:image/png;base64[^"]+")',
    r'\1,' + c4_entries,
    html
)

# 3. Update LOBSTER_COLORS to include c4 (add as index 4)
# Find and replace the LOBSTER_COLORS definition
old_array = '''var LOBSTER_COLORS = [
    ["lobster_c0_neutral","lobster_c0_happy","lobster_c0_sad","lobster_c0_sick"],
    ["lobster_c1_neutral","lobster_c1_happy","lobster_c1_sad","lobster_c1_sick"],
    ["lobster_c2_neutral","lobster_c2_happy","lobster_c2_sad","lobster_c2_sick"],
    ["lobster_c3_neutral","lobster_c3_happy","lobster_c3_sad","lobster_c3_sick"]
];'''

new_array = '''var LOBSTER_COLORS = [
    ["lobster_c0_neutral","lobster_c0_happy","lobster_c0_sad","lobster_c0_sick"],
    ["lobster_c1_neutral","lobster_c1_happy","lobster_c1_sad","lobster_c1_sick"],
    ["lobster_c2_neutral","lobster_c2_happy","lobster_c2_sad","lobster_c2_sick"],
    ["lobster_c3_neutral","lobster_c3_happy","lobster_c3_sad","lobster_c3_sick"],
    ["lobster_c4_neutral","lobster_c4_happy","lobster_c4_sad","lobster_c4_sick"]
];'''

html = html.replace(old_array, new_array)

# 4. Update randLobsterColor to include c4 (5 colors total)
old_rand = '''function randLobsterColor(){
    var r = Math.random();
    if (r < 0.4) return 0;
    if (r < 0.6) return 1;
    if (r < 0.8) return 2;
    return 3;
}'''

new_rand = '''function randLobsterColor(){
    var r = Math.random();
    if (r < 0.4) return 0;  // 红色 c0
    if (r < 0.6) return 1;  // 蓝色 c1
    if (r < 0.8) return 2;  // 紫色 c2
    if (r < 0.9) return 3;  // 粉色 c3
    return 4;                // 红色 c4
}'''

html = html.replace(old_rand, new_rand)

# 5. Update Math.random() * 5 in two places
html = html.replace('ST.lobsterColor = Math.floor(Math.random() * 5);', 
                   'ST.lobsterColor = Math.floor(Math.random() * 5);')
# Check for other random() calls
# They already used * 5 in previous session, just verify

# Write back
with open(r"C:\Users\jack\.qclaw\workspace\projects\vpet\index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Done! Added c4 red lobster.")
print(f"c4_neutral: {len(c4_neutral)} chars")
print(f"c4_happy: {len(c4_happy)} chars")
print(f"c4_sad: {len(c4_sad)} chars")
print(f"c4_sick: {len(c4_sick)} chars")
