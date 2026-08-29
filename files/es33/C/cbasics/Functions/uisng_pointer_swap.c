#include <stdio.h>
void swap(int *x, int *y)
{
    int temp;
    temp = *x;
    *x = *y;
    *y = temp;
    printf("in the swap functin :: %p %p\n", (void *)x, (void *)y);
    // printf("after swping :: %d %d\n ", *x, *y);
}
int main()
{
    int a, b;
    scanf("%d%d", &a, &b);
    printf("before swaping :: %d %d\n", a, b);
    swap(&a, &b);
    printf("after swping :: %d %d\n ", a, b);
    // printf("in the swap functin :: %p %p\n", (void *)a, (void *)b);
    return 0;
}