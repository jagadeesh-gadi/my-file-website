#include <stdio.h>
void square(int num)
{
    int x = num * num;
    printf("it was a square :: %d\n ", x);
}
int main()
{
    int s;
    scanf("%d", &s);
    for(int i=1;i<=s;i++)
    square(i);
    return 0;
}