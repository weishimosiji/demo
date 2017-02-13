package com.example.administrator.myxutil;

import android.content.Context;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Map;

/**
 * Created by Administrator on 2016/12/2.
 */
public class ListenerInvocationHandler implements InvocationHandler{
    private Context context;
    private Map<String,Method> methodMap;

    public ListenerInvocationHandler(Context context, Map<String, Method> methodMap) {
        this.context = context;
        this.methodMap = methodMap;
    }

    @Override
    public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
        String name = method.getName();
        Method method1 = methodMap.get(name);
        if(method1==null){
            //不需要代理
            return method.invoke(o,objects);
        }else{
            return method1.invoke(context,objects);
        }
    }
}
