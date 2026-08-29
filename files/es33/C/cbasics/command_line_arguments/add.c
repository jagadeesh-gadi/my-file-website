#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[])
{
    int a, b;
    if (argc != 3)
    {
        printf(" only 2 arguments need to enter \n");
    }
    else
    {
        a = atoi(argv[1]);
        b = atoi(argv[2]);
        int sum = a + b;
        printf("%d\n", sum);
    }
    return 0;
}
