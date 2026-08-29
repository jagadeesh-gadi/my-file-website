#include <stdio.h>
void increment(int *x)
{

    *x++;
    printf("in function reference :: %p\n", (void *)x);
}
int main()
{
    int a;
    scanf("%d", &a);
    printf("before in main() :: %p\n", (void *)&a);
    increment(&a);
    printf("after in main() :: %d\n", a);
    return 0;
}