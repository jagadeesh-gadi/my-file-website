#include<stdio.h>

void function(int a,int b)
{ 
    int temp;
    temp =a;
    a=b;
    b=temp;
    printf("inside the fucntion = %d %d\n",a,b);
}
    int main(){

        int x,y;
        printf("enter x,y values :: ");
        scanf("%d %d",&x,&y);

        function(x,y);
        printf("out side of fucntion == %d %d \n",x,y);

}