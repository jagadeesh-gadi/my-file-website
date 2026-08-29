#include <stdio.h>

int main()
{
    int a,b,c;
    printf("enter 3 values :: ");
    scanf("%d%d%d",&a,&b,&c);
    int d=(a>=b && a>=c)?printf("a is lagest") : (b>=a && b>=c )?printf("b is largest"):printf("c is largest");

    return 0;
}