#include <stdio.h>
// extern int count = 11;  // so that already decleared int using again extern wont be accepted compile time error

int count = 10;
void extern_1()
{
    //  int  x=10; cannot access the local variable from inside the block;
    count++;
    printf("count values :%d\n", count);
}