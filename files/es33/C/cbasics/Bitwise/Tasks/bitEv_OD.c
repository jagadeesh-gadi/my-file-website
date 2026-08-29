#include <stdio.h>

int main()
{
    int n; 
    scanf("%d",&n);

    (n & 1) ? printf("odd - %d\n", n) : printf("even - %d\n", n);
    
    return 0;
}