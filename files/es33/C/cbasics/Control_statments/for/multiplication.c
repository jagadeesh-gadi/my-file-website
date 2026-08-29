#include <stdio.h>

int main()
{
    int n,i,m;
    printf("enter n value :: ");
    scanf("%d%d",&n,&m);

    for(i=1;i<=m;i++){
        printf("%d x %d = %d\n ",n,i,n*i);
    }

    return 0;
}