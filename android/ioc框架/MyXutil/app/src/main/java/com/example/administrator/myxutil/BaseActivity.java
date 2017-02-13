package com.example.administrator.myxutil;

import android.app.Activity;
import android.os.Bundle;


/**
 * Created by Administrator on 2016/12/2.
 */
public class BaseActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        InjectUtils.inject(this);
    }
}
