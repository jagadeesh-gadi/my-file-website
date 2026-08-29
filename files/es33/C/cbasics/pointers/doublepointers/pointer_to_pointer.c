#include <stdio.h>

int main()
{
    int a = 10;
    int *p = &a;
    int **dptr = &p;
    int ***tptr = &dptr;

    printf("%d\n", a);
    printf("%d\n", *p);
    printf("%d\n", **dptr);
    printf("%d\n", ***tptr);

    printf("%p\n", &a);
    printf("%p\n", (void *)&p);
    printf("%p\n", (void *)&dptr);
    printf("%p\n", (void *)&tptr);

    **dptr = 50;
    printf("%d\n", a);
    int y = 100;
    *dptr = &y;

    printf("%d\n", *p);
    printf("%d\n", **dptr);

    return 0;
}