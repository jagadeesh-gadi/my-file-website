#include <stdio.h>

int main()
{
    int i;
 scanf("%d",&i);
 printf("%d\n%d\n%d\n",++i,i,i++);//right to left 
 printf("==========================================\n");
  printf("%d\n%d\n%d\n",i++,i,++i);//right to left
   printf("==========================================\n");
   printf("%d\n%d\n%d\n",++i,i++,i);
    return 0;
}