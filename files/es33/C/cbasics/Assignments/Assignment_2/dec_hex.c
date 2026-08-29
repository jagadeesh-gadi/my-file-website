#include <stdio.h>

int main()
{
    int i=0,j,a[20],n;
    int rem;
    scanf("%d",&n);

    while (n>0)
    {
        rem=n%16;
         n/=16;

        if(rem>=0 && rem <10){
            rem=n+48;
        }
        else if (rem>='A' && rem <='F'){
          
         rem=n+55;
        }
        
    }
    
    return 0;
}