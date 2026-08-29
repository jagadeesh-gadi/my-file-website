// count set bits in a array and based on that sort the array into increasing order

#include <stdio.h>
#define size 5
int main()
{
    int arr[size], i, j, k, count=0;
    for(i =0;i<size;i++){
        scanf("%d",&arr[i]);
    }

    for(i=0;i<size;i++){
        for(j=0;j<size;j++){
            if(arr[j])
            count++;
        }
    }
    return 0;
}