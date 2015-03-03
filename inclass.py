#!/usr/bin/python

x = raw_input("Please enter an integer:")
x =int (x)

if x<0:
	x =0
	print 'no negative numbers allowed'
elif x == 2:
	print 'x is 2!!'
elif x > 10:
	print 'x is greater tha 10!'

else:
	print 'x is less than 10 greater than 0 and not 10'
print ' you picked wrong'