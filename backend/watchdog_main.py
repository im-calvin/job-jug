import subprocess
import time


main_script_path = "main.py"


while True:
    time.sleep(1)
    try:
        # Start the main script
        subprocess.run(["python", main_script_path])
        print("social seafarer " + main_script_path + " started")
    except Exception as e:
        print(f"Script crashed: {e}")
        print("Restarting in 5 seconds...")
        time.sleep(5)