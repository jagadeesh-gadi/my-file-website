#include <stdio.h>
#define size 5
int main()
{
    int arr[size], i, j, temp;
    int zero = 0, postivie = 0, negative = 0;
    for (i = 0; i < size; i++)
    {
        scanf("%d", &arr[i]);
    }
    for (i = 0; i < size; i++)
    {

        if (arr[i] == 0)
        {
            zero++;
        }
        else if (arr[i] > 0)
        {
            postivie++;
        }
        else
        {
            negative++;
        }
    }
    printf("zeros == %d\n", zero);
    printf("positive == %d\n", postivie);
    printf("negative == %d\n", negative);
    return 0;
}