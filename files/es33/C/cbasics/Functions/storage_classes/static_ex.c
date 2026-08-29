#include <stdio.h>

static int func_s()
{
    // static int global = 100;
    return 10;
    // printf("hello\n");
    // printf("a values %d",a);
}

int (*file())()
{
    return func_s;
}