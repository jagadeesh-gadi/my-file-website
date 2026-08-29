#include <stdio.h>
#define SQUARE(x) ((x) * (x))
int main()
{
    int result;
    result = SQUARE(5);
    printf("%d\n", result);
    return 0;
}