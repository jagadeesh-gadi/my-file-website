#include <stdio.h>

int main()
{
    char str[] = "jagadeesz JAGADEESH";
    int high = 0;
    for (int i = 0; str[i] != '\0' && str[i] != '\n'; i++)
    {
        if (str[i] > high)
            high = str[i];
    }
    printf("%d\n", high);
    return 0;
}