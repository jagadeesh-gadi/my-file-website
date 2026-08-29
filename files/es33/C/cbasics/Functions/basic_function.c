#include <stdio.h>

int add(int a, int b)
{
	int s;
	s =a+b;
	return s;
}

int main()
{

	int x, y;
	scanf("%d%d", &x, &y);
	int sb = add(x, y);
	printf("addition of values %d and %d  are  ::  %d\n ",x,y,sb);
}
