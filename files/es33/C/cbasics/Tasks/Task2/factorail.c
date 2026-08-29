#include <stdio.h>

int main()
{
    int i,j,n,s=1;
    printf("enter n number : ");
    scanf("%d",&n);
    
    for(int i=1;i<=n;i++)
    {
        s*=i;
    }
       printf("factiroil of given numbr = %d\n",s);
    return 0;
}