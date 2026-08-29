#include <stdio.h>

int main()
{
    extern int count;

    extern_1(); // the values was increment always the function calling from the extern keyword and also it was keep updating  11

    extern_1(); // 12
    extern_1(); // 13

    // extern int x;
    // printf("count value ::%d\n", x);
    printf("count value ::%d\n", count); // 13

    return 0;
}