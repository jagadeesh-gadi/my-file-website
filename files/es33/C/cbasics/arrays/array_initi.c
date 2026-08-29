#include <stdio.h>

int main()
{
    int temp[5] = {20, 30, 40, 50, 60};
    printf("%p\n", (void *)temp);
    printf("index\tvalue\taddress\n");
    printf("============================\n");
    for (int i = 0; i < 5; i++)
    {
        printf("%d\t%d\t%p\n", i, temp[i], (void *)&temp[i]);
    }
    printf("============================\n");
    // verifiy the size of arrys
    printf("temperature size :: %zu\n", sizeof(temp));
    printf("temperature size :: %zu\n", sizeof(temp[0]));
    printf("temperature size ::%zu\n", sizeof(temp) / sizeof(temp[0]));
    printf("============================\n");
    // verifyu array name first element address
    printf("temp address :: %p\n", (void *)temp);
    printf("&temp[0]   :: %p\n", (void *)&temp[0]);

    printf("============================\n");

    // verify values access
    printf("%d\n", *temp);

    printf("%d\n", temp[0]);
    printf("============================\n");
    // verify out of bound array access
    printf("temp[5] = %d\n", temp[5]);
    printf("============================\n");
    // verify thorugh the point of arthimetic
    printf("temp == %p\n", (void *)temp);
    printf("temp == %p\n", (void *)(temp + 1));
    printf("temp == %p\n", (void *)(temp + 2));

    printf("============================\n");
    // verify the equals points arthemic
    printf("%d\n", temp[2]);
    printf("%d\n", *(temp + 2));
    return 0;
}