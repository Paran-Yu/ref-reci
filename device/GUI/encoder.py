import RPi.GPIO as GPIO
import PyQt5 import QThread
import time

class Encoder:
    def __init__(self):
        self.SW = 17         # switch
        self.DT = 27         # signal
        self.CLK = 22        # clock

        self.oldCLK = 0
        self.oldDT = 0

        self.main()

    def setup(self):
        GPIO.setup(self.SW, GPIO.IN)
        GPIO.setup(self.DT, GPIO.IN)
        GPIO.setup(self.CLK, GPIO.IN)

        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BCM)


    def get_direction(self):
        direction = 0
        newCLK = GPIO.input(self.CLK)
        newDT = GPIO.input(self.DT)
        # if clk low -> high => change direction
        if (newCLK != self.oldCLK):
                if(self.oldCLK == 0):
                        direction = self.oldDT * 2 - 1
        oldCLK = newCLK
        oldDT = newDT

        # CW: -1, CCW: +1
        return direction

    def main(self):
        self.setup()

        while True:
            print(GPIO.input(self.SW))
            print(self.get_direction())
            time.sleep(0.1)

class MyThread(QThread):
    mySignal = Signal(int)

    def __init__(self):
        super().__init__()

    # Thread start 누르면 자동 호출출
   def run(self):
        for i in range(5):
            # emit으로 시그널 전송
            self.mySignal.emit(i)
            sleep(1)