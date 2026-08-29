#include <stdio.h>

int main()
{
    char n;
    scanf("%s",&n);

    if(n%2==0){
        printf("left shift ::%s",(n<<1));
    }
    else{
        printf("right shift :: %s ",(n>>1));
    }
    return 0;
}