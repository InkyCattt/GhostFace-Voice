import sys
from tiktok_voice import tts, Voice

# Get text from Node.js
if len(sys.argv) < 2:
    print("No text provided", file=sys.stderr)
    sys.exit(1)

text = sys.argv[1]

# Output file
output_file = "output.mp3"

# Call TikTok Ghostface TTS
tts(text, Voice.GHOSTFACE, output_file, play_sound=False)

# Send audio bytes to Node.js
with open(output_file, "rb") as f:
    sys.stdout.buffer.write(f.read())
