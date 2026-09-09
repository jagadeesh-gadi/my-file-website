#include <stdio.h>
union data_u
{

	int i;
	double f;
	char c;
};

struct data_s
{
	int i;
	float f;
	char c;
};

int main()
{

	struct data_s s = {10, 29.09, 'R'};
	union data_u u;

	u.i = 10;
	printf("%d\n", u.i);

	u.f = 222.5;
	u.c = 's';
	printf("%f %c\n", u.f, u.c);
	printf("size of union ::%zu\n", sizeof(struct data_s));
	printf("size of union ::%zu\n", sizeof(union data_u));
	return 0;
}
