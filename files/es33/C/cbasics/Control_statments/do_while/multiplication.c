#include <stdio.h>

int main()
{
    int n,i,m;
    printf("enter n value :: ");
    scanf("%d%d",&n,&m);

   do{
        printf("%d x %d = %d\n ",n,i,n*i);
        i++;
    }
    while (i<=m);

    

    return 0;
}