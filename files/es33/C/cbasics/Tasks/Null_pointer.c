#include <stdio.h>

int main()
{
    int *ptr=NULL;
    printf("before crashed");
    *ptr =100;
    printf("after crashed");
    return 0;
}