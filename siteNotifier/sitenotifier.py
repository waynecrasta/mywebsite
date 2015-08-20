from requests import get
from time import sleep
import smtplib
import datetime
import difflib

URL = 'https://courses.illinois.edu/schedule/2015/fall/ECE/385'
sender = 'mrtomshekler@gmail.com'
password = 'rezvlsobcqpisepf'
recipient = 'wayne.crasta@gmail.com'
subject = 'The Website has changed'
body = 'The website %s has changed' % (URL)
message = 'Subject: %s\n\n%s' % (subject, body)


def didSiteChange():
    print("RUNNING")
    first = get(URL)
    # 15 Minutes
    sleep(900)
    second = get(URL)
    now = datetime.datetime.now()
    time = now.strftime("%a %m/%d at %I:%M %p")
    print("\nCHECK at %s") % (time)
    if first.text != second.text:
        print("\n\nWEBSITE CHANGED\n\n")
        diff = difflib.ndiff(first.text.splitlines(1), second.text.splitlines(1))
        diff = list(diff)
        print ''.join(difflib.restore(diff, 1))
        return True
    else:
        print("\nWEBSITE NOT CHANGED\n")
        return False


def sendEmail(sender, recipient, message, password):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender, password)
    server.sendmail(sender, recipient, message)
    server.quit()


def readPage():
    fo = open("foo.html", "wb")
    r = get('https://courses.illinois.edu/schedule/2015/fall/ECE/385')
    fo.write(r.text)
    fo.close()

while True:
    if didSiteChange():
        print("\nSending Email to %s\n") % (recipient)
        sendEmail(sender, recipient, message, password)
# readPage()
