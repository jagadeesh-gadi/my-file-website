#include<stdio.h>

void swap(int *a , int *b){
int temp;
temp = *a;
*a=*b;
*b=temp;
}
int main(){
    int x,y;
    printf("enter the  values to swap =");
    scanf("%d %d",&x,&y);

    swap(&x,&y);
    printf("after swapping the number = %d %d",x,y);
}