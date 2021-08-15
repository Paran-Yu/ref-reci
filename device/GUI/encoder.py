import RPi.GPIO as GPIO
from PyQt5.QtCore import *
import time

class Encoder:
    def __init__(self):
        self.SW = 17         # switch
        self.DT = 27         # signal
        self.CLK = 22        # clock

        self.oldCLK = 0
        self.oldDT = 0

        self.setup()
        self.main()

    def setup(self):
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BCM)

        GPIO.setup(self.SW, GPIO.IN)
        GPIO.setup(self.DT, GPIO.IN)
        GPIO.setup(self.CLK, GPIO.IN)

    def clicked_sw(self, pin):
        print("CLICK")

    def get_direction(self):
        direction = 0
        newCLK = GPIO.input(self.CLK)
        newDT = GPIO.input(self.DT)
        # if clk low -> high => change direction
        if (newCLK != self.oldCLK):
                if(self.oldCLK == 0):
                        direction = self.oldDT * 2 - 1
        self.oldCLK = newCLK
        self.oldDT = newDT

        # CW: -1, CCW: +1
        return direction

    def main(self):
        GPIO.add_event_detect(self.SW, GPIO.FALLING, callback=self.clicked_sw, bouncetime=200)
        while True:
            print(self.get_direction())
            time.sleep(0.01)

class MyThread(QThread):
    # mySignal = Signal(int)

    def __init__(self):
        super().__init__()

    # Thread start 누르면 자동 호출
    def run(self):
        self.encoder = Encoder()

