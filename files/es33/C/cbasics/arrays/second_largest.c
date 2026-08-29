#include <stdio.h>

int main()
{
    int i;

    int arr[5];

    for (int i = 0; i < 5; i++)
    {
        scanf("%d", &arr[i]);
    }
    int l, sl;
    l = sl = arr[0];
    for (i = 0; i < 5; i++)
    {

        if (arr[i] > l)
        {

            sl = l;
            l = arr[i];
        }
        else if (arr[i] > sl && arr[i] != l)
        {
            sl = arr[i];
        }
    }
    printf("largest == %d\n", l);
    printf("second largest == %d\n", sl);
    return 0;
}