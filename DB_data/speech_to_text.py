from google.cloud import speech

# set GOOGLE_APPLICATION_CREDENTIALS="C:/Ddrive/2021/ssafy2/common/git/S05P12A203/DB_data/ssafy-common-pjt-ef68f0e5ff35.json"

local_file_path = ""

client = speech.SpeechClient()

config = speech.RecognitionConfig(

)