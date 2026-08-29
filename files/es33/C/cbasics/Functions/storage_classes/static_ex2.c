#include <stdio.h>
int (*file())();


int main()
{
    // extern int global;
    int (*fp)();

    fp = file();

    printf("%d\n",fp());
    // printf("%d\n", );
    return 0;
}